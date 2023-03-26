package put.poznan.planthub.user;

import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import put.poznan.planthub.security.JwtGenerator;
import put.poznan.planthub.security.projections.AuthResponseDTO;
import put.poznan.planthub.user.projections.RegisterDto;
import put.poznan.planthub.user.roles.Role;
import put.poznan.planthub.user.roles.RoleRepository;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class UserService implements UserDetailsService {

    public UserService(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtGenerator jwtGenerator) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    private JwtGenerator jwtGenerator;

    private RoleRepository roleRepository;

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));
    }

    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles){
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }


    public ResponseEntity<String> register(RegisterDto registerDto) {
        if(userRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Username is taken!", HttpStatus.BAD_REQUEST);
        } else {
            User user =new User();
            user.setEmail(registerDto.getEmail());
            user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
            user.setFirstName(registerDto.getFirstName());
            user.setLastName(registerDto.getLastName());
            user.setPhone(registerDto.getPhone());
            user.setVotes(0L);
            user.setCity(registerDto.getCity());

            Role roles = roleRepository.findByName("USER").get();
            user.setRoles(Collections.singletonList(roles));

            userRepository.save(user);
            return new ResponseEntity<>("User registered success!", HttpStatus.OK);
        }
    }

    public ResponseEntity<AuthResponseDTO> login(Authentication authentication) {

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
    }

    public User getUser(Long id) throws ChangeSetPersister.NotFoundException {
        return userRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }
}
