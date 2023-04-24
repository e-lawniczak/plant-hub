package put.poznan.planthub.file;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import put.poznan.planthub.file.projections.FileDto;
import put.poznan.planthub.offer.Offer;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    Optional<File> findById(Long id);

    Optional<List<File>> findAllByName(String name);

    boolean existsById(Long id);

    @Query(
        value="SELECT * FROM files WHERE files.offer_id = :id",
        nativeQuery=true
    )
    List<File> findAllByOffer(@Param("id") Offer offerId);
}
