import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

class TestApp(unittest.TestCase):
    def setUp(self):
        options = webdriver.ChromeOptions()
        self.driver = webdriver.Chrome(options=options)
        self.driver.maximize_window()

    def tearDown(self):
        self.driver.quit()

    def test01_register_user(self):
        driver = self.driver
        driver.get("http://localhost:4200/user/register")
        driver.find_element(By.ID, "mat-input-1").send_keys("barrantesa088@gmail.com")
        driver.find_element(By.ID, "mat-input-2").send_keys("tony1611")
        driver.find_element(By.ID, "mat-input-3").send_keys("Password123!")
        driver.find_element(By.TAG_NAME, "form").submit()
        time.sleep(1.5)
        self.assertNotIn("/register", driver.current_url)
        
    def test02_login_user(self):
        driver = self.driver
        driver.get("http://localhost:4200/user/login")
        driver.find_element(By.ID, "mat-input-1").send_keys("barrantesa088@gmail.com")
        driver.find_element(By.ID, "mat-input-2").send_keys("Password123!")
        time.sleep(1)  # espera a que el botón se habilite
        driver.find_element(By.TAG_NAME, "form").submit()
        time.sleep(1.5)
        self.assertNotIn("/login", driver.current_url)

    def test03_create_movie(self):
        driver = self.driver
        driver.get("http://localhost:4200/admin/movie/add")

        driver.find_element(By.ID, "title").send_keys("Título de prueba")
        driver.find_element(By.ID, "overview").send_keys("Esta es una overview de prueba.")
        driver.find_element(By.ID, "popularity").clear()
        driver.find_element(By.ID, "popularity").send_keys("42")
        driver.find_element(By.ID, "release_date").clear()
        driver.find_element(By.ID, "release_date").send_keys("2025-12-31")
        driver.find_element(By.ID, "image").send_keys("https://example.com/image.jpg")
        driver.find_element(By.XPATH, "//span[contains(text(), 'Add image')]/ancestor::button").click()
        driver.find_element(By.ID, "search").send_keys("Anya" + Keys.ENTER)
        time.sleep(1)
        driver.find_element(By.XPATH, "//mat-card[contains(., 'Anya')]//button").click()
        driver.find_element(By.XPATH, "//span[contains(text(), 'Confirm')]/ancestor::button").click()
        time.sleep(2)
        self.assertIn("/", driver.current_url)

    def test04_edit_movie(self):
        driver = self.driver
        driver.get("http://localhost:4200/admin/movie/edit")

        driver.find_element(By.ID, "title").clear()
        driver.find_element(By.ID, "title").send_keys("Película editada")

        driver.find_element(By.ID, "overview").clear()
        driver.find_element(By.ID, "overview").send_keys("Nueva descripción para la película editada.")

        driver.find_element(By.ID, "popularity").clear()
        driver.find_element(By.ID, "popularity").send_keys("84")

        driver.find_element(By.ID, "release_date").clear()
        driver.find_element(By.ID, "release_date").send_keys("2026-01-15")

        driver.find_element(By.ID, "image").clear()
        driver.find_element(By.ID, "image").send_keys("https://example.com/newimage.jpg")
        driver.find_element(By.XPATH, "//span[contains(text(), 'Add image')]/ancestor::button").click()

        driver.find_element(By.ID, "search").clear()
        driver.find_element(By.ID, "search").send_keys("Keanu" + Keys.ENTER)
        time.sleep(1)
        driver.find_element(By.XPATH, "//mat-card[contains(., 'Keanu Reeves')]//button").click()

        driver.find_element(By.XPATH, "//span[contains(text(), 'Confirm')]/ancestor::button").click()
        time.sleep(2)
        self.assertIn("/", driver.current_url)

    def test05_delete_movie(self):
        driver = self.driver
        driver.get("http://localhost:4200/user/login")
        driver.find_element(By.ID, "mat-input-1").send_keys("sfabricito@gmail.com")
        driver.find_element(By.ID, "mat-input-2").send_keys("Password123!")
        driver.find_element(By.TAG_NAME, "form").submit()
        time.sleep(2)
        self.assertNotIn("/login", driver.current_url)

        driver.get("http://localhost:4200/movie/6340535139")
        time.sleep(2)

        delete_icon = driver.find_element(By.XPATH, "//button//mat-icon[contains(text(), 'delete')]")
        driver.execute_script("arguments[0].click();", delete_icon)  # force: true
        time.sleep(2)

        self.assertIn("/", driver.current_url)

if __name__ == "__main__":
    unittest.main()
