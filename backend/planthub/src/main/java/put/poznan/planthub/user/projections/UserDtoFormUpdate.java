package put.poznan.planthub.user.projections;

import lombok.Value;
import put.poznan.planthub.user.User;

@Value
public class UserDtoFormUpdate {

    private String firstName;

    private String lastName;

    private String phone;

    private String city;
    public void updateUser(User user) {
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPhone(phone);
        user.setCity(city);
    }
}
