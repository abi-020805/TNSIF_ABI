package shopowner;


//import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ownerdetail")
public class ShopOwner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   // @Column(name = "id") 
    private Integer ShopOwnerId;
    private String name;
    private String shopName;
    private String contactInfo;
    
	public Integer getId() {
		return ShopOwnerId;
	}
	public void setShopOwnerId(Integer ShopOwnerId) {
		this.ShopOwnerId = ShopOwnerId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public String getContactInfo() {
		return contactInfo;
	}
	public void setContactInfo(String contactInfo) {
		this.contactInfo = contactInfo;
	}
	
    // Generate constructors
    public ShopOwner() {
        super();
    }

    public ShopOwner(String name, String shopName, String contactInfo, int ShopOwnerId) {
        super();
        this.ShopOwnerId = ShopOwnerId;
        this.name = name;
        this.shopName = shopName;
        this.contactInfo = contactInfo;
    }

    // Generate toString()
    @Override
    public String toString() {
        return "ShopOwner [ShopOwnerId=" + ShopOwnerId + ", name=" + name + ", shopName=" + shopName + ", contactInfo=" + contactInfo + "]";
    }

    
}
