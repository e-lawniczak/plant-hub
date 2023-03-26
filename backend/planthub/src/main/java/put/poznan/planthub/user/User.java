package put.poznan.planthub.user;

import lombok.*;
import put.poznan.planthub.user.roles.Role;

import javax.persistence.*;
import java.util.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String firstName;

    private String lastName;

    private String phone;

    private String password;

    private String city;

    private Long votes;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name="user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private List<Role> roles = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(email, user.email) && Objects.equals(firstName, user.firstName) && Objects.equals(lastName, user.lastName) && Objects.equals(phone, user.phone) && Objects.equals(password, user.password) && Objects.equals(city, user.city) && Objects.equals(votes, user.votes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, firstName, lastName, phone, password, city, votes);
    }
}
