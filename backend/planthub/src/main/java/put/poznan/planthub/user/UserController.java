package put.poznan.planthub.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import put.poznan.planthub.security.JwtGenerator;
import put.poznan.planthub.security.projections.AuthResponseDTO;
import put.poznan.planthub.user.projections.LoginDto;
import put.poznan.planthub.user.projections.RegisterDto;


@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/users")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        return userService.register(registerDto);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
        return userService.login(authentication);
    }


    @GetMapping("/user/{id}")
    public User getUser(@PathVariable("id") Long id) throws ChangeSetPersister.NotFoundException {
        return userService.getUser(id);
    }
}
