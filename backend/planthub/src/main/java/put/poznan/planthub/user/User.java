package put.poznan.planthub.user;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import put.poznan.planthub.offer.Offer;
import put.poznan.planthub.user.roles.Role;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "users")
public class User implements UserDetails {
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

    @Column(columnDefinition = "varchar(255) default ''")
    private String token;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name="user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private List<Role> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.DETACH,
        CascadeType.REFRESH })
    private List<Offer> offers;

    // // wielu użytkowników może repować jednego użytkownika 
    // @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH})
    // @JoinTable(name = "user_rep", joinColumns = @JoinColumn(name="user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "rep_user_id", referencedColumnName = "id"))
    // private User reppedUser; // tylko jedno id może być w tabeli

    // jeden użytkownik może repować wielu użytkowników
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(name = "user_rep", joinColumns = @JoinColumn(name="user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "rep_user_id", referencedColumnName = "id"))
    private List<User> reppingUsers; // może się powtarzać
    

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(email, user.email) && Objects.equals(firstName, user.firstName) && Objects.equals(lastName, user.lastName) && Objects.equals(phone, user.phone) && Objects.equals(password, user.password) && Objects.equals(city, user.city) && Objects.equals(votes, user.votes) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, firstName, lastName, phone, password, city, votes);
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
