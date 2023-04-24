package put.poznan.planthub.offer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import javax.swing.text.html.Option;

@EnableJpaRepositories
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    Optional<Offer> findById(Long id);

    boolean existsById(Long id);

    // TODO: zwracanie tylko nieusuniętych
    @Query(value = "SELECT * FROM offers WHERE offers.deleted = false", nativeQuery = true)
    List<Offer> findAllNotDeleted();
}
