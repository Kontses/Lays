import os
from PIL import Image

# Καθορισμός φακέλου με τα assets
public_dir = r"c:\Users\tas\source\Lays\public"

def optimize_logo():
    logo_path = os.path.join(public_dir, "logo.png")
    if os.path.exists(logo_path):
        print("Βελτιστοποίηση του logo.png...")
        # Άνοιγμα της αρχικής εικόνας
        with Image.open(logo_path) as img:
            # Αλλαγή μεγέθους σε 256x240px με χρήση Lanczos resampling για μέγιστη ποιότητα
            resized_img = img.resize((256, 240), Image.Resampling.LANCZOS)
            # Αποθήκευση με βελτιστοποίηση (συμπίεση)
            resized_img.save(logo_path, "PNG", optimize=True)
            print(f"Το logo.png βελτιστοποιήθηκε επιτυχώς! Νέο μέγεθος: {os.path.getsize(logo_path)/1024:.1f} KB")
    else:
        print("Σφάλμα: Το logo.png δεν βρέθηκε!")

def convert_images_to_webp():
    # Λίστα με τις εικόνες των προϊόντων (σακούλες πατατακίων)
    images = ["image 1.png", "image 2.png", "image 3.png", "image 4.png"]
    for img_name in images:
        img_path = os.path.join(public_dir, img_name)
        if os.path.exists(img_path):
            webp_name = img_name.replace(".png", ".webp")
            webp_path = os.path.join(public_dir, webp_name)
            print(f"Μετατροπή του {img_name} σε {webp_name}...")
            # Άνοιγμα και μετατροπή σε WebP με 85% ποιότητα για εξαιρετικό λόγο ποιότητας/μεγέθους
            with Image.open(img_path) as img:
                img.save(webp_path, "WEBP", quality=85, method=6)
                print(f"Το {webp_name} δημιουργήθηκε! Μέγεθος: {os.path.getsize(webp_path)/1024:.1f} KB (Αρχικό: {os.path.getsize(img_path)/1024:.1f} KB)")
        else:
            print(f"Προειδοποίηση: Το {img_name} δεν βρέθηκε!")

if __name__ == "__main__":
    optimize_logo()
    convert_images_to_webp()
    print("Όλες οι εικόνες βελτιστοποιήθηκαν επιτυχώς!")
