package put.poznan.planthub.user.projections;

import lombok.*;

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

    private String password;

    private String city;

    private Long votes;
}
