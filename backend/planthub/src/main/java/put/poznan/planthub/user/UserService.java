package put.poznan.planthub.user;

import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import put.poznan.planthub.security.JwtGenerator;
import put.poznan.planthub.security.projections.AuthResponseDTO;
import put.poznan.planthub.user.projections.RegisterDto;
import put.poznan.planthub.user.projections.UserDto;
import put.poznan.planthub.user.projections.UserDtoFormUpdate;
import put.poznan.planthub.user.roles.Role;
import put.poznan.planthub.user.roles.RoleRepository;

import java.util.*;



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
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
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
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    public ResponseEntity<AuthResponseDTO> login(Authentication authentication) {

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
    }

    public ResponseEntity<UserDto> getUser(String email) throws UsernameNotFoundException{
        return new ResponseEntity<>(UserDto.of(loadUserByUsername(email)), HttpStatus.OK);
    }

    public ResponseEntity<UserDto> updateUser(String email, UserDtoFormUpdate userToUpdate) throws ChangeSetPersister.NotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(ChangeSetPersister.NotFoundException::new);
        userToUpdate.updateUser(user);
        userRepository.save(user);
        return new ResponseEntity<>(UserDto.of(user), HttpStatus.OK);
    }

    public ResponseEntity<String> deleteUser(String email) throws ChangeSetPersister.NotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(ChangeSetPersister.NotFoundException::new);
        userRepository.delete(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

