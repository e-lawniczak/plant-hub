package put.poznan.planthub.offer;

import java.util.List;
import java.util.Optional;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import put.poznan.planthub.offer.projections.AllOffersDto;
import put.poznan.planthub.offer.projections.OfferDto;
import put.poznan.planthub.user.User;
import put.poznan.planthub.user.UserRepository;

@Service
public class OfferService {
    private UserRepository userRepository;
    private OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.offerRepository = offerRepository;

    }

    public Offer loadOfferById(Long id) throws NotFoundException {
        return offerRepository.findById(id).orElseThrow(() -> new NotFoundException());
    }

    public ResponseEntity<String> addOffer( OfferDto offerDto) {

        Offer offer = new Offer();
        Optional<User> user = userRepository.findByEmail(offerDto.getEmail());


        if (user.isEmpty())
            return new ResponseEntity<>("User does not exist!", HttpStatus.BAD_REQUEST);

        offer.setTitle(offerDto.getTitle());
        offer.setDescription(offerDto.getDescription());
        offer.setDate(offerDto.getDate());
        // offer.setFiles(null);
        offer.setActive(true);
        offer.setCategory(offerDto.getCategory());
        offer.setUser(user.get());

        offerRepository.save(offer);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<OfferDto> getOffer(Long id) throws NotFoundException {
        return new ResponseEntity<>(OfferDto.of(loadOfferById(id)), HttpStatus.OK);
    }

    public ResponseEntity<List<AllOffersDto>> getAllOffers() {

        List<Offer> offers = offerRepository.findAll();

        List<AllOffersDto> response = offers.stream().map(o -> AllOffersDto.of(o)).toList() ;

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
