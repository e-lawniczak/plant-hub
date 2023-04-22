package put.poznan.planthub.offer.projections;

import java.util.Date;

import lombok.*;
import put.poznan.planthub.offer.Offer;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class OfferDto {
    // private Long id;

    private String email;

    private String title;

    private String description;

    private String category;

    private Date date;

    // private Boolean active;
    
    public static OfferDto of(Offer offer) {
        if (offer == null) {
            return null;
        }
        return new OfferDto(offer);
    }

    private OfferDto(Offer offer) {
        // id = offer.getId();
        email = offer.getUser().getEmail();
        title = offer.getTitle();
        description = offer.getDescription();
        category = offer.getCategory();
        date = offer.getDate();
        // active = offer.getActive();
    }
}
