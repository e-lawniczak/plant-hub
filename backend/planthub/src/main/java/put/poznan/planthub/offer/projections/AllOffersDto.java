package put.poznan.planthub.offer.projections;

import java.util.Date;

import lombok.*;
import put.poznan.planthub.offer.Offer;
import put.poznan.planthub.user.User;
import put.poznan.planthub.user.projections.UserDto;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AllOffersDto  {
    private Long id;

    private String title;

    private String description;

    private String category;

    private Date date;

    private Boolean active;

    private UserDto user;

    public static AllOffersDto of(Offer offer) {
        if (offer == null) {
            return null;
        }
        return new AllOffersDto(offer);
    }

    private AllOffersDto(Offer offer) {
        id = offer.getId();
        title = offer.getTitle();
        description = offer.getDescription();
        category = offer.getCategory();
        date = offer.getDate();
        active = offer.getActive();
        user = UserDto.of(offer.getUser());
    }

}
