package put.poznan.planthub.offer;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import put.poznan.planthub.offer.projections.AllOffersDto;
import put.poznan.planthub.offer.projections.OfferDto;
import put.poznan.planthub.offer.projections.UpdateOfferDto;
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

    public ResponseEntity<String> addOffer(OfferDto offerDto, String email) {

        Offer offer = new Offer();
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty())
            return new ResponseEntity<>("User does not exist!", HttpStatus.BAD_REQUEST);

        offer.setTitle(offerDto.getTitle());
        offer.setDescription(offerDto.getDescription());
        offer.setDate(offerDto.getDate());
        // offer.setFiles(null);
        offer.setActive(true);
        offer.setDeleted(false);
        offer.setCategory(offerDto.getCategory());
        offer.setUser(user.get());

        offerRepository.save(offer);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<OfferDto> getOffer(Long id) throws NotFoundException {
        return new ResponseEntity<>(OfferDto.of(loadOfferById(id)), HttpStatus.OK);
    }

    public ResponseEntity<AllOffersDto> getSingleOffer(Long id) throws NotFoundException {
        return new ResponseEntity<>(AllOffersDto.of(loadOfferById(id)), HttpStatus.OK);
    }

    public ResponseEntity<OfferDto> updateOffer(Long id, UpdateOfferDto offerUpdate) {
        Optional<Offer> offer = offerRepository.findById(id);

        if (offer.isEmpty())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        offerUpdate.updateOffer(offer.get());
        offerRepository.save(offer.get());
        return new ResponseEntity<>(OfferDto.of(offer.get()), HttpStatus.OK);
    }

    public ResponseEntity<OfferDto> deleteOffer(Long id) {
        Optional<Offer> offer = offerRepository.findById(id);

        if (offer.isEmpty() || offer.get().getDeleted().booleanValue())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        offer.get().setDeleted(true);
        offerRepository.save(offer.get());
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    public ResponseEntity<List<AllOffersDto>> getAllOffers() {

        List<Offer> offers = offerRepository.findAllNotDeleted();

        Collections.sort(offers, Comparator.comparingLong(Offer::getId));
        List<AllOffersDto> response = offers.stream().map(o -> AllOffersDto.of(o)).toList();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
