import requests
import time

url_A102="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0030-3010-8036-CAC04F573333&field=installed_softwares"
r_A102 = requests.get(url_A102)

url_A103="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0033-3010-8050-B9C04F444E32&field=installed_softwares"
r_A103 = requests.get(url = url_A103)

url_A104="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0051-3610-8048-B1C04F4C4732&field=installed_softwares"
r_A104 = requests.get(url = url_A104)

url_A105="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0047-5610-8032-B5C04F514A33&field=installed_softwares"
r_A105 = requests.get(url = url_A105)

url_A200="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0031-3610-804B-C3C04F574C32&field=installed_softwares"
r_A200 = requests.get(url = url_A200)

url_A201="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0031-3510-804E-C3C04F574C32&field=installed_softwares"
r_A201 = requests.get(url = url_A201)

url_A202="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0043-4710-805A-C7C04F385632&field=installed_softwares"
r_A202 = requests.get(url = url_A202)

url_A203="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0032-5910-804B-B9C04F444E32&field=installed_softwares"
r_A203 = requests.get(url = url_A203)

url_A205="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0034-5810-8052-C4C04F304433&field=installed_softwares"
r_A205 = requests.get(url = url_A205)

url_A300="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-004E-5710-8051-CAC04F345732&field=installed_softwares"
r_A300 = requests.get(url = url_A300)

url_A304="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0030-3010-8036-C3C04F573333&field=installed_softwares"
r_A304 = requests.get(url = url_A304)

url_A307="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0032-5710-8051-B9C04F444E32&field=installed_softwares"
r_A307 = requests.get(url = url_A307)

url_B501="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0033-5610-8043-B6C04F385032&field=installed_softwares"
r_B501 = requests.get(url = url_B501)

url_B502="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0050-5710-8051-C8C04F345732&field=installed_softwares"
r_B502 = requests.get(url = url_B502)

url_C200="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0042-3010-8047-B7C04F433033&field=installed_softwares"
r_C200 = requests.get(url = url_C200)

url_CRDOC="http://Login:Password@wapt.iut.local/api/v1/host_data?uuid=4C4C4544-0054-3510-8059-CAC04F5A5232&field=installed_softwares"
r_CRDOC = requests.get(url = url_CRDOC)

respA102 = requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_A102.text,'salle':'A102'})
print(respA102).text
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_A103.text,'salle':'A103'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_A104.text,'salle':'A104'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_A105.text,'salle':'A105'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_A200.text,'salle':'A200'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_A201.text,'salle':'A201'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_A202.text,'salle':'A202'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_A203.text,'salle':'A203'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_A205.text,'salle':'A205'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_A300.text,'salle':'A300'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_A304.text,'salle':'A304'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_A307.text,'salle':'A307'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_B501.text,'salle':'B501'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_B502.text,'salle':'B502'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_C200.text,'salle':'C200'})
time.sleep(3)
requests.post("https://winlog.iut-rodez.fr/admin/liste/files.php", data={'donnees': r_CRDOC.text,'salle':'CRDOC'})