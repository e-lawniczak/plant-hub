package put.poznan.planthub.user.projections;

import lombok.*;
import put.poznan.planthub.user.User;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserDto {
    private Long id;
    private String email;

    private String firstName;

    private String lastName;

    private String phone;

    private String city;

    private Long votes;

    public static UserDto of(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user);
    }

    private UserDto(User user) {
                id = user.getId();
                email = user.getEmail();
                firstName = user.getFirstName();
                lastName = user.getLastName();
                phone = user.getPhone();
                city = user.getCity();
                votes = user.getVotes();
    }
}
