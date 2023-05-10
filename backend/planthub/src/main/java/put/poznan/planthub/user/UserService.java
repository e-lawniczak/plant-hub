package put.poznan.planthub.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import put.poznan.planthub.offer.Offer;
import put.poznan.planthub.offer.OfferRepository;
import put.poznan.planthub.offer.projections.AllOffersDto;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private JwtGenerator jwtGenerator;

    private RoleRepository roleRepository;

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;
    private OfferRepository offerRepository;

    public UserService(RoleRepository roleRepository, UserRepository userRepository, OfferRepository offerRepository,
            PasswordEncoder passwordEncoder,
            JwtGenerator jwtGenerator) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.offerRepository = offerRepository;
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

    public ResponseEntity<Void> addFavOffer(String email, Long offerId) {
        User user = loadUserByUsername(email);
        Optional<Offer> offer = offerRepository.findById(offerId);

        if (user == null || offer.isEmpty() || offer.get().getDeleted().booleanValue())
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);

        List<Offer> likedOffers = user.getLikedOffers();

        if (user.getLikedOffers().contains(offer.get())) {
            return new ResponseEntity<Void>(HttpStatus.OK);
        } else {
            likedOffers.add(offer.get());
            offer.get().setLikes(offer.get().getLikes() + 1);
        }

        user.setLikedOffers(likedOffers);
        userRepository.save(user);
        offerRepository.save(offer.get());
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    public ResponseEntity<Void> deleteFavOffer(String email, Long offerId) {
        User user = loadUserByUsername(email);
        Optional<Offer> offer = offerRepository.findById(offerId);

        if (user == null || offer.isEmpty() || offer.get().getDeleted().booleanValue())
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);

        List<Offer> likedOffers = user.getLikedOffers();

        if (user.getLikedOffers().contains(offer.get())) {
            likedOffers.remove(offer.get());
            offer.get().setLikes(offer.get().getLikes() - 1);
        } else {
            return new ResponseEntity<Void>(HttpStatus.OK);
        }

        user.setLikedOffers(likedOffers);
        userRepository.save(user);
        offerRepository.save(offer.get());
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    public ResponseEntity<List<AllOffersDto>> getAllFavs(String email) {
        User user = loadUserByUsername(email);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<Offer> liked = user.getLikedOffers();
        List<AllOffersDto> response = liked.stream().map(o -> AllOffersDto.of(o)).collect(Collectors.toList());

        return new ResponseEntity<List<AllOffersDto>>(response, HttpStatus.OK);

    }

    public ResponseEntity<Boolean> checkFavOffer(String email, Long offerId) {
        User user = loadUserByUsername(email);
        Optional<Offer> offer = offerRepository.findById(offerId);

        if (user == null || offer.isEmpty())
            return new ResponseEntity<Boolean>(true, HttpStatus.BAD_REQUEST);

        if (user.getLikedOffers().contains(offer.get()))
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        return new ResponseEntity<Boolean>(false, HttpStatus.OK);
    }

}
