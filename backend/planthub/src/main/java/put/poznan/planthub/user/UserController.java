package put.poznan.planthub.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import put.poznan.planthub.security.JwtGenerator;
import put.poznan.planthub.security.projections.AuthResponseDTO;
import put.poznan.planthub.user.projections.LoginDto;
import put.poznan.planthub.user.projections.RegisterDto;
import put.poznan.planthub.user.projections.UserDto;


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


    @GetMapping("/user/{email}")
    public ResponseEntity<UserDto> getUser(@PathVariable("email") String email) throws ChangeSetPersister.NotFoundException {
        return userService.getUser(email);
    }

    @PostMapping("/user/{email}")
    public ResponseEntity<String> test(@PathVariable("email") String email) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok("Elo");
    }
    @PatchMapping("/user/{email}")
    public ResponseEntity<String> test2(@PathVariable("email") String email) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok("Elo2");
    }
    @PutMapping("/user/{email}")
    public ResponseEntity<String> test3(@PathVariable("email") String email) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok("Elo3");
    }
    @DeleteMapping("/user/{email}")
    public ResponseEntity<String> test4(@PathVariable("email") String email) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok("Elo4");
    }
}
