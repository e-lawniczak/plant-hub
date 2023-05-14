package put.poznan.planthub.offer;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import put.poznan.planthub.file.FileService;
import put.poznan.planthub.offer.category.Category;
import put.poznan.planthub.offer.category.CategoryRepository;
import put.poznan.planthub.offer.projections.AllOffersDto;
import put.poznan.planthub.offer.projections.OfferDto;
import put.poznan.planthub.offer.projections.UpdateOfferDto;
import put.poznan.planthub.user.User;
import put.poznan.planthub.user.UserRepository;

@Service
public class OfferService {
    private UserRepository userRepository;
    private OfferRepository offerRepository;
    @Autowired
    private FileService fileService;

    @Autowired
    private CategoryRepository categoryRepository;

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
        offer.setActive(offerDto.getActive());
        offer.setDeleted(false);
        offer.setCategory(categoryRepository.findCategoryByName(offerDto.getCategory()));
        offer.setUser(user.get());
        offer.setLikes(0);

        Offer added = offerRepository.save(offer);
        if (added != null)
            return new ResponseEntity<>(added.getId().toString(), HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

    public ResponseEntity<OfferDto> getOffer(Long id) throws NotFoundException {
        return new ResponseEntity<>(OfferDto.of(loadOfferById(id)), HttpStatus.OK);
    }

    public ResponseEntity<AllOffersDto> getSingleOffer(Long id) throws NotFoundException {
        return new ResponseEntity<>(AllOffersDto.of(loadOfferById(id)), HttpStatus.OK);
    }

    public ResponseEntity<OfferDto> updateOffer(Long id, UpdateOfferDto offerUpdate) {
        Optional<Offer> offer = offerRepository.findById(id);

        if (offer.isEmpty() || offer.get().getDeleted().booleanValue())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        Offer updatedOffer = updateOffer(offer.get(), offerUpdate);
        offerRepository.save(updatedOffer);
        return new ResponseEntity<>(OfferDto.of(updatedOffer), HttpStatus.OK);
    }
    private Offer updateOffer(Offer offer, UpdateOfferDto offerUpdate){
        offer.setActive(offerUpdate.getActive());
        offer.setTitle(offerUpdate.getTitle());
        offer.setCategory(categoryRepository.findCategoryByName(offerUpdate.getCategory()));
        offer.setDescription(offerUpdate.getDescription());

        return offer;
    }
    public ResponseEntity<OfferDto> deleteOffer(Long id) {
        Optional<Offer> offer = offerRepository.findById(id);

        if (offer.isEmpty() || offer.get().getDeleted().booleanValue())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        offer.get().setDeleted(true);
        offerRepository.save(offer.get());
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    public ResponseEntity<OfferDto> toggleActiveOffer(Long id) {
        Optional<Offer> offer = offerRepository.findById(id);

        if (offer.isEmpty() || offer.get().getDeleted().booleanValue())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        offer.get().setActive(!offer.get().getActive());
        offerRepository.save(offer.get());
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    public ResponseEntity<List<AllOffersDto>> getAllOffers() {

        List<Offer> offers = offerRepository.findAllNotDeleted();

        Collections.sort(offers, Comparator.comparingLong(Offer::getId));
        List<AllOffersDto> response = offers.stream().map(o -> AllOffersDto.of(o)).collect(Collectors.toList());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<List<AllOffersDto>> getUserOffers(String email) {
        long id = userRepository.findByEmail(email).get().getId();
        List<Offer> offers = offerRepository.findAllById(id);
        Collections.sort(offers, Comparator.comparing(Offer::getActive).thenComparingLong(Offer::getId));
        List<AllOffersDto> response = offers.stream().map(o -> AllOffersDto.of(o)).collect(Collectors.toList());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // Category change
    public ResponseEntity<List<Category>> getAllCategories() {
        return new ResponseEntity<>(categoryRepository.findAll(), HttpStatus.OK);
    }
}