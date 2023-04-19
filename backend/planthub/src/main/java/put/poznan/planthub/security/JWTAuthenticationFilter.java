package put.poznan.planthub.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import put.poznan.planthub.user.User;
import put.poznan.planthub.user.UserService;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtGenerator tokenGenerator;
    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = getJWTFromRequest(request);

        if(StringUtils.hasText(token) && tokenGenerator.validateToken(token)) {
            String email = tokenGenerator.getEmailFromJWT(token);

            if(request.getRequestURI().contains(email) || request.getMethod().equals("GET")){
                User user = userService.loadUserByUsername(email);

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
        filterChain.doFilter(request, response);
    }

    private String getJWTFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
