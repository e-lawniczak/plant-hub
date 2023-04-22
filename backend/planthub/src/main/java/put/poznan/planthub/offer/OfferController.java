package put.poznan.planthub.offer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import put.poznan.planthub.offer.projections.AllOffersDto;
import put.poznan.planthub.offer.projections.OfferDto;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/offers")
public class OfferController {
    @Autowired
    private OfferService offerService;

    @Secured("USER")
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody OfferDto offer) {

        return offerService.addOffer(offer);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AllOffersDto>> getAllOffers(){
        return offerService.getAllOffers();
    }
}
