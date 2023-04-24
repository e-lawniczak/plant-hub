package put.poznan.planthub.user;

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
import put.poznan.planthub.user.projections.RepUserDto;
import put.poznan.planthub.user.projections.UserDto;
import put.poznan.planthub.user.projections.UserDtoFormUpdate;
import put.poznan.planthub.user.roles.Role;
import put.poznan.planthub.user.roles.RoleRepository;

import java.util.Collections;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private JwtGenerator jwtGenerator;

    private RoleRepository roleRepository;

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    public UserService(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder,
            JwtGenerator jwtGenerator) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public ResponseEntity<String> register(RegisterDto registerDto) {
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Username is taken!", HttpStatus.BAD_REQUEST);
        } else {
            User user = new User();
            user.setEmail(registerDto.getEmail());
            user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
            user.setFirstName(registerDto.getFirstName());
            user.setLastName(registerDto.getLastName());
            user.setPhone(registerDto.getPhone());
            user.setVotes(0L);
            user.setCity(registerDto.getCity());
            user.setToken("");

            Role roles = roleRepository.findByName("USER").get();
            user.setRoles(Collections.singletonList(roles));

            userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    public ResponseEntity<AuthResponseDTO> login(Authentication authentication, String email) {

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);

        User user = loadUserByUsername(email);

        user.setToken(token);

        userRepository.save(user);

        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
    }

    public ResponseEntity<Void> logout(String email) {
        User user = loadUserByUsername(email);
        user.setToken("");
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<UserDto> getUser(String email) throws UsernameNotFoundException {
        return new ResponseEntity<>(UserDto.of(loadUserByUsername(email)), HttpStatus.OK);
    }

    public ResponseEntity<UserDto> updateUser(String email, UserDtoFormUpdate userToUpdate)
            throws UsernameNotFoundException {
        User user = loadUserByUsername(email);
        userToUpdate.updateUser(user);
        userRepository.save(user);
        return new ResponseEntity<>(UserDto.of(user), HttpStatus.OK);
    }

    public ResponseEntity<Void> deleteUser(String email) throws UsernameNotFoundException {
        User user = loadUserByUsername(email);
        userRepository.delete(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<Void> repUser(String email, String repEmail) throws UsernameNotFoundException {
        User user = loadUserByUsername(email); // user który daje +1
        User userRep = loadUserByUsername(repEmail); // user który otzymuje +1

        if (userRep.getReppingUsers().contains(user) || userRep.getEmail().equals(user.getEmail()))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        // List<User> currentRep = user.getReppingUsers();
        // user.setReppingUsers(null);
        RepUserDto updateRep = new RepUserDto(userRep.getReppingUsers(), userRep.getVotes());
        updateRep.repUser(userRep, user);
        userRepository.save(userRep);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<Boolean> isUserRepped(String email, String repEmail) throws UsernameNotFoundException {
        User user = loadUserByUsername(email); // user który daje +1
        User userRep = loadUserByUsername(repEmail); // user który otzymuje +1

        if (userRep.getReppingUsers().contains(user) || userRep.getEmail().equals(user.getEmail()))
            return new ResponseEntity<>(true, HttpStatus.OK);

        return new ResponseEntity<>(false, HttpStatus.OK);
    }

}
