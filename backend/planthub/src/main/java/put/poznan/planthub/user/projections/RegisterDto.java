package put.poznan.planthub.user.projections;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterDto {
    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private String phone;

    private String city;

}