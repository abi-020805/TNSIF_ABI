package shopowner;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ShopOwnerService {

    @Autowired
    private ShopOwnerRepository repo;

    // Get a list of all shop owners
    public List<ShopOwner> listAll() {
        return repo.findAll();
    }

    // Save a shop owner (insert or update)
    public void save(ShopOwner shopowner) {
        repo.save(shopowner);
    }

    // Get a shop owner by ID, throws an exception if not found
    public ShopOwner get(Integer id) {
        Optional<ShopOwner> shopOwner = repo.findById(id);
        return shopOwner.orElseThrow(() -> new RuntimeException("ShopOwner not found with id: " + id));
    }

    // Delete a shop owner by ID
    public void delete(Integer id) {
        repo.deleteById(id);
    }
}
