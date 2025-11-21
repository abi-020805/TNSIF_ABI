import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShopOwnerService } from './ShopOwner.service';

interface ShopOwner {
  id: number | null;
  name: string;
  shopName: string;
  contactInfo: string;
}

@Component({
  selector: 'app-shop-owner-root',
  templateUrl: './ShopOwner.component.html',
  styleUrls: ['./ShopOwner.component.scss']
})
export class ShopOwnerComponent implements OnInit {
  title = 'shopowners';
  shopOwners: ShopOwner[] = [];
  shopOwnerToUpdate: ShopOwner = { id: null, name: '', shopName: '', contactInfo: '' };

  constructor(private shopOwnerService: ShopOwnerService) {}

  ngOnInit(): void {
    this.getShopOwners();
  }

  /** ✅ Add new ShopOwner */
  register(registerForm: NgForm): void {
    const newShopOwner: ShopOwner = {
      id: null,
      name: registerForm.value.name,
      shopName: registerForm.value.shopName,
      contactInfo: registerForm.value.contactInfo
    };

    this.shopOwnerService.registerShopOwners(newShopOwner).subscribe(
      (response: any) => {
        // If backend returns the created record, add it immediately to the table
        this.shopOwners.push(response || newShopOwner);
        registerForm.reset();
      },
      error => console.error('Error registering Shop Owner:', error)
    );
  }

  /** ✅ Fetch all ShopOwners from backend */
  getShopOwners(): void {
    this.shopOwnerService.getShopOwners().subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.shopOwners = response;
        } else if (response._embedded?.shopOwners) {
          this.shopOwners = response._embedded.shopOwners.map((so: any) => ({
            id: so.id,
            name: so.name || '',
            shopName: so.shopName || '',
            contactInfo: so.contactInfo || ''
          }));
        } else {
          this.shopOwners = [];
        }
      },
      error => console.error('Error fetching shop owners:', error)
    );
  }

  /** ✅ Delete from backend + instantly update table */
  deleteShopOwner(shopOwner: ShopOwner): void {
    if (!shopOwner.id) {
      console.warn('Cannot delete: missing ID', shopOwner);
      return;
    }

    if (confirm(`Are you sure you want to delete "${shopOwner.name}"?`)) {
      this.shopOwnerService.deleteShopOwners(shopOwner.id).subscribe(
        () => {
          this.shopOwners = this.shopOwners.filter(s => s.id !== shopOwner.id);
          console.log('Deleted:', shopOwner);
        },
        error => console.error('Error deleting Shop Owner:', error)
      );
    }
  }

  /** ✅ Trigger edit modal manually to avoid Bootstrap conflict */
  edit(shopOwner: ShopOwner): void {
    this.shopOwnerToUpdate = { ...shopOwner };

    // Manually open Bootstrap modal (important!)
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  /** ✅ Update backend + table, close modal */
  updateShopOwner(): void {
    if (!this.shopOwnerToUpdate.id) return;

    this.shopOwnerService.updateShopOwners(this.shopOwnerToUpdate).subscribe(
      (updated: ShopOwner) => {
        const index = this.shopOwners.findIndex(s => s.id === this.shopOwnerToUpdate.id);
        if (index !== -1) {
          this.shopOwners[index] = updated;
        }

        this.shopOwnerToUpdate = { id: null, name: '', shopName: '', contactInfo: '' };

        // Close modal manually after successful update
        const modalElement = document.getElementById('editModal');
        if (modalElement) {
          const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
      },
      error => console.error('Error updating Shop Owner:', error)
    );
  }
}
