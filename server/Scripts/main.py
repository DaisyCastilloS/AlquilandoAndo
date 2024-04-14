import time
import threading

# modulos de terceros
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
 


# modulos propios
from module.helpers import *
from module.colores import * 
from module.selenium_indetectable import iniciar_webdriver
import json
class Remax():
    def __init__(self, headless=True, Size=100) -> None:
        self.size = Size
 
        self.driver = iniciar_webdriver(headless=headless)
        self.lock = threading.Lock()
        self.wait = WebDriverWait(self.driver, 20)
        self.start_time = time.time()
        self.properties = []
        self.length = 0
        self.divs = []
        


        self.get_length()
        self.get_properties_to_scrape()
        self.driver.close()
    def get_properties(self) -> dict:
        return self.properties
    
    def get_length(self) -> None:
        url = self.create_url(page=0,Size=self.size)
        try:
            divs = self.get_divs(url, 0)
            self.divs = divs
        except:
            pass
        try:
            p = self.wait.until(EC.visibility_of_all_elements_located((By.CSS_SELECTOR,"p.mat-ripple.number")))[-1]
            self.length = int(p.text)
            
        except:
            pass
    def get_properties_to_scrape(self) -> None:
        for i in range(1,self.length+1):
            url = self.create_url(page=i,Size=self.size)
            self.run_scrape()
            self.divs = self.get_divs(url, i)
 
    def get_divs(self, url, i) -> list:

        self.driver.get(url)
        divs = []
        try:
            divs = self.wait.until(EC.visibility_of_all_elements_located((By.CSS_SELECTOR, "qr-card-property.ng-star-inserted")))

        except:
            divs = []


        return divs

    def get_data(self, div,i) -> dict:
        property = {}
        title = ""
        price = ""
        address = ""
        location = ""
        url = ""
        imagenes = []
        total_size = ""
        rooms = ""
        bathrooms = ""
        try:
            div.find_element(By.CSS_SELECTOR,"div.primary")

            try:
                title = div.find_element(By.CSS_SELECTOR,"p.card__description")
                title = title.text
            except:
                title = ""
            
            property["title"] = title
            try:
                price = div.find_element(By.CSS_SELECTOR,"p.card__price.ng-star-inserted")

                price = price.text
            except NoSuchElementException:
                price = "0"
        
            property["price"] = price

            try:
                address = div.find_element(By.CSS_SELECTOR,"p.card__address")

                address = address.text
            except NoSuchElementException:
                address = ""
            try:
                location = div.find_element(By.CSS_SELECTOR,"p.card__ubication.ng-star-inserted")

                location = location.text
            except NoSuchElementException:
                location = ""

            property["address"] = address + " " + location
            
            try:
                total_size = div.find_element(By.CSS_SELECTOR,"div.card__feature--item.feature--m2total.ng-star-inserted p")

                total_size = total_size.text
            except NoSuchElementException:
                total_size = "Sin especificar"

            property["total_size"] = total_size 

            try:
                rooms = div.find_element(By.CSS_SELECTOR,"div.card__feature--item.feature--ambientes.ng-star-inserted p")

                rooms = rooms.text
            except NoSuchElementException:
                rooms = "#"

            property["rooms"] = rooms 

            try:
                bathrooms = div.find_element(By.CSS_SELECTOR,"div.card__feature--item.feature--bathroom.ng-star-inserted p")

                bathrooms = bathrooms.text
            except NoSuchElementException:
                bathrooms = "#"

            property["bathrooms"] = bathrooms 

            try:
                url = div.find_element(By.CSS_SELECTOR,"a")

                url = url.get_attribute("href")
            except NoSuchElementException:
                url = "#"

            property["url"] = url 
            try:
                imagenes = div.find_elements(By.CSS_SELECTOR,"div.swiper-wrapper img")
                imagenes = [imagen.get_attribute("src") for imagen in imagenes][0:3]

            except NoSuchElementException:
                imagenes = []

            property["images"] = imagenes 
        except:
            pass
        return property
    
    def lock_scrape(self,div = '',i = 0) -> None:

        with self.lock:
            property = self.get_data(div = div,i = i)
            if len(property) > 0:
                self.properties.append(property)

    def run_scrape(self):
        threads = []
        i = 1
        for div in self.divs: 
            t = threading.Thread(target=self.lock_scrape, args=(div, i))
            threads.append(t)
            t.start()
            i+=1

        for t in threads:
            t.join()


    def create_url(self,page = 0, Size = 20) -> str:
        url = f"https://www.remax.com.ar/listings/rent?page={page}&pageSize={Size}&sort=%2BpriceUsd&in:operationId=2&in:typeId=9,10,11,1,2,3,4,5,6,7,8"

        return url
chunk_size = 1000 
if __name__ == '__main__':

    remax = Remax(Size=250)
    data = remax.get_properties() 
    data_parse = json.dumps(data)
    with open("./public/data/propiedades.json", "w") as f:
        for i in range(0, len(data), chunk_size):
            chunk = data[i:i+chunk_size]
            data_parse = json.dumps(chunk, indent=2)  # Adjust indentation
            f.write(data_parse)
    print(data_parse)
  
    