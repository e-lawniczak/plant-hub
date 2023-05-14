package put.poznan.planthub.offer;

import lombok.*;

import put.poznan.planthub.file.File;
import put.poznan.planthub.offer.category.Category;
import put.poznan.planthub.user.User;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "offers")
public class Offer  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Category category;

    private Date date;

    private Boolean active;
    
    private Boolean deleted;
    private Integer likes;

    @ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.DETACH,
            CascadeType.REFRESH })
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "offer")
    private List<File> files;

  

}
