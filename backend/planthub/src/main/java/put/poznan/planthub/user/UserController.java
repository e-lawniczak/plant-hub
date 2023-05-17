package put.poznan.planthub.user;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import put.poznan.planthub.offer.projections.AllOffersDto;
import put.poznan.planthub.security.projections.AuthResponseDTO;
import put.poznan.planthub.user.projections.LoginDto;
import put.poznan.planthub.user.projections.RegisterDto;
import put.poznan.planthub.user.projections.UserDto;
import put.poznan.planthub.user.projections.UserDtoFormUpdate;


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
        return userService.login(authentication, loginDto.getEmail());
    }
    @PostMapping("/user/{email}/logout")
    public ResponseEntity<Void> logout(@PathVariable("email") String email) throws UsernameNotFoundException {
        return userService.logout(email);
    }
    @PostMapping("/user/repuser/{email}/{repemail}")
    public ResponseEntity<Void> repUser(@PathVariable("email") String email, @PathVariable("repemail") String repEmail) throws UsernameNotFoundException {
        return userService.repUser(email, repEmail);
    }
    @PatchMapping("/user/favorites/add/{email}/{offerId}")
    public ResponseEntity<Void> addFav(@PathVariable("email") String email, @PathVariable("offerId") Long offerId) throws UsernameNotFoundException {
        return userService.addFavOffer(email, offerId);
    }
    @PatchMapping("/user/favorites/delete/{email}/{offerId}")
    public ResponseEntity<Void> deleteFav(@PathVariable("email") String email, @PathVariable("offerId") Long offerId) throws UsernameNotFoundException {
        return userService.deleteFavOffer(email, offerId);
    }
    @GetMapping("/user/favorites/checkfav/{email}/{offerId}")
    public ResponseEntity<Boolean> checkFavorite(@PathVariable("email") String email, @PathVariable("offerId") Long offerId) throws UsernameNotFoundException {
        return userService.checkFavOffer(email,offerId);
    }
    @GetMapping("/user/favorites/{email}")
    public ResponseEntity<List<AllOffersDto>> getAllFavs(@PathVariable("email") String email) throws UsernameNotFoundException {
        return userService.getAllFavs(email);
    }
    @GetMapping("/user/checkrepuser/{email}/{repemail}")
    public ResponseEntity<Boolean> checkRepUser(@PathVariable("email") String email, @PathVariable("repemail") String repEmail) throws UsernameNotFoundException {
        return userService.isUserRepped(email, repEmail);
    }
    @GetMapping("/user/{email}")
    public ResponseEntity<UserDto> getUser(@PathVariable("email") String email) throws UsernameNotFoundException {
        return userService.getUser(email);
    }

    @PutMapping("/user/{email}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("email") String email, @RequestBody UserDtoFormUpdate user) throws UsernameNotFoundException {
        return userService.updateUser(email, user);
    }
    @DeleteMapping("/user/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable("email") String email) throws UsernameNotFoundException {
        return userService.deleteUser(email);
    }
}