-- --------------------------------------------------------
-- Verkkotietokone:              127.0.0.1
-- Palvelinversio:               10.4.9-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Versio:              10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for jobmatch
DROP DATABASE IF EXISTS `jobmatch`;
CREATE DATABASE IF NOT EXISTS `jobmatch` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `jobmatch`;

-- Dumping structure for taulu jobmatch.image
DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `task_id` int(11) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- Dumping data for table jobmatch.image: ~6 rows (suunnilleen)
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
REPLACE INTO `image` (`image_id`, `url`, `task_id`) VALUES
	(7, 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Inside_haskolatorg_university_of_iceland.jpg', 14),
	(8, 'https://upload.wikimedia.org/wikipedia/commons/4/45/Strucla_sweet_bread02.jpg', 14),
	(9, 'https://upload.wikimedia.org/wikipedia/commons/3/33/Doug%27s_Gym_Inside.jpg', 16),
	(10, 'https://upload.wikimedia.org/wikipedia/commons/4/45/Strucla_sweet_bread02.jpg', 15),
	(11, 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Inside_haskolatorg_university_of_iceland.jpg', 17),
	(12, 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Spuelbuerste_fcm.jpg', 18),
	(13, 'https://annalanhuvila.files.wordpress.com/2018/08/syreenijuhla-annala-1118.jpg?w=1180&h=610&crop=1', 19),
	(14, 'https://upload.wikimedia.org/wikipedia/commons/9/90/L%C3%A4nsiranta_3_Tornio_1952_03.jpg', 20),
	(15, 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Stacked_wood.JPG', 21),
	(16, 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Krokussen_%28Crocus%29%2C_Locatie%2C_Tuinreservaat_Jonkervallei.jpg', 22),
	(17, 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Hammer.jpg', 23),
	(18, 'https://upload.wikimedia.org/wikipedia/commons/8/85/Ceramics_2.jpg', 24),
	(19, 'https://annalanhuvila.files.wordpress.com/2018/08/syreenijuhla-annala-1118.jpg?w=1180&h=610&crop=1', 25),
	(20, 'https://annalanhuvila.files.wordpress.com/2018/08/syreenijuhla-annala-1118.jpg?w=1180&h=610&crop=1', 26);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;

-- Dumping structure for taulu jobmatch.location
DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `location_name` varchar(63) DEFAULT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table jobmatch.location: ~2 rows (suunnilleen)
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
REPLACE INTO `location` (`location_id`, `location_name`) VALUES
	(1, 'Joku toinen paikka'),
	(2, 'Annalan Huvila');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;

-- Dumping structure for taulu jobmatch.results
DROP TABLE IF EXISTS `results`;
CREATE TABLE IF NOT EXISTS `results` (
  `results_id` int(11) NOT NULL AUTO_INCREMENT,
  `fysiikka_value` int(11) DEFAULT NULL,
  `ajattelu_value` int(11) DEFAULT NULL,
  `sosiaalisuus_value` int(11) DEFAULT NULL,
  PRIMARY KEY (`results_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- Dumping data for table jobmatch.results: ~24 rows (suunnilleen)
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
REPLACE INTO `results` (`results_id`, `fysiikka_value`, `ajattelu_value`, `sosiaalisuus_value`) VALUES
	(1, 3, 3, 3),
	(2, 3, 3, 3),
	(3, 3, 3, 3),
	(4, 2, 2, 2),
	(5, 3, 3, 3),
	(6, 3, 3, 3),
	(7, 3, 3, 3),
	(8, 3, 3, 3),
	(9, 3, 3, 3),
	(10, 3, 3, 3),
	(11, 3, 3, 3),
	(12, 3, 3, 3),
	(13, 3, 3, 3),
	(14, 3, 3, 3),
	(15, 3, 3, 3),
	(16, 3, 3, 3),
	(17, 3, 3, 3),
	(18, 3, 3, 3),
	(19, 3, 3, 3),
	(20, 3, 3, 3),
	(21, 3, 3, 3),
	(22, 3, 3, 3),
	(23, 3, 3, 3),
	(24, 1, 5, 2),
	(25, 3, 3, 3),
	(26, 3, 3, 3),
	(27, 3, 3, 3),
	(28, 3, 3, 3);
/*!40000 ALTER TABLE `results` ENABLE KEYS */;

-- Dumping structure for taulu jobmatch.suggestion
DROP TABLE IF EXISTS `suggestion`;
CREATE TABLE IF NOT EXISTS `suggestion` (
  `suggestion_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(31) DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  PRIMARY KEY (`suggestion_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table jobmatch.suggestion: ~0 rows (suunnilleen)
/*!40000 ALTER TABLE `suggestion` DISABLE KEYS */;
/*!40000 ALTER TABLE `suggestion` ENABLE KEYS */;

-- Dumping structure for taulu jobmatch.task
DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(31) DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  `ajattelu_value` int(11) DEFAULT NULL,
  `fysiikka_value` int(11) DEFAULT NULL,
  `sosiaalisuus_value` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(31) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `task_when` varchar(255) DEFAULT NULL,
  `location_id` int(11) NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- Dumping data for table jobmatch.task: ~6 rows (suunnilleen)
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
REPLACE INTO `task` (`task_id`, `name`, `description`, `ajattelu_value`, `fysiikka_value`, `sosiaalisuus_value`, `email`, `phone`, `link`, `date`, `task_when`, `location_id`) VALUES
	(14, 'Kahvilan vapaaehtoinen', 'Annalan huvilassa toimii sunnuntaisin ja tapahtumien yhteydessä Annalan huvilan ystävien ylläpitämä Café Anneberg. Kahvila ottaa lämmöllä vastaan kaikki kahvilatoiminnasta kiinnostuneet vapaaehtoiset. Tule mukaan opastamaan, keskustelemaan asiakkaiden kanssa, keittämään kahvia ja laittamaan esille ihanat leivonnaiset, joita vapaaehtoiset valmistavat tunnelmalliseen Café Annebergiin.', 2, 2, 4, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2),
	(15, 'Leipuri', 'Onko sinulla takuuvarma isoäidin omenapiirakkaresepti? Tai ohje maailman parhaaseen siemenlevitteeseen? Leivotko gluteenitonta leipää, jonka tuoksu saa veden herahtamaan kielelle? Café Annebergin tuotteet valmistetaan vapaaehtoisvoimin. Café Annebergissa tarjotaan monipuolisia leivonnaisia, joissa huomioidaan myös erityisruokavaliot ja kestävän kehityksen periaatteet. Kaikki jauhopeukalot ovat lämpimästi tervetulleita leipureiden tiimiin.', 3, 3, 2, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2),
	(16, 'Salin vapaaehtoinen', 'Eikö leipominen ole alaasi, mutta kahvilan tunnelma ja sosiaalisuus innostaa suuresti? Tule mukaan keskustelemaan asiakkaiden kanssa, pitämään huolta kahvilasalin siisteydestä ja edistämään sitä ihanaa tunnelmaa, joka Café Annebergissä vallitsee.', 3, 3, 4, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2),
	(17, 'Kahvilan kassa', 'Oletko haka laskutoimituksissa? Opitko uudet järjestelmät helposti? Tule kassahenkilöksi! Kahvilan kassan tärkeä tehtävä on kuvailla tuotteita houkuttelevasti, myydä pikkuleipä pelkän kahvin ostajalle, olla opastamassa kävijöitä ja rakentaa kutsuvaa ilmapiiriä.', 4, 1, 4, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2),
	(18, 'Tiskari', 'Rakastatko kahvilatunnelmaa ja yhdessä tekemistä, mutta asiakkaiden kanssa sosialisointi ei tunnu sinun jutultasi? Tule keittiövapaaehtoiseksi tiskaamaan astioita, keittämään kahvia ja pitämään yllä keittiön järjestystä. Rooli on tärkeä osa kahvilan herkkää ekosysteemiä, jossa pääsee tutustumaan muihin kahvilavapaaehtoisiin, mutta vältyt asiakaspalvelulta.', 1, 4, 1, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2),
	(19, 'Opas', 'Oletko intohimoinen historiaharrastaja tai olet kiinnostunut ryhmien opastamisesta? Toisinaan järjestämme tapahtumien osana kävelykierroksia, jotka käsittelevät Annalan historiaa, kaunista muotopuutarhaa ja jopa Annalan keväällä kukkivia syreenipensaita. Opastuksia on myös monella kielellä, suomeksi, ruotsiksi, englanniksi ja joskus saksaksi tai venäjäksi. Tule tutustumaan Annalan monipuoliseen kulttuurihistoriaan, ja jakamaan tietoutta kiinnostuneille kävijöille.', 4, 2, 5, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2),
	(20, 'Kaakeliuunin lämmittäjä', 'Saatko sen hankalimman mökkisaunan kiukaan syttymään ensimmäisellä kerralla? Haluaisitko ehkä oppia? Tule mukaan lämmittämään Annalan huvilan alkuperäisiä Arabian kaakeleista valmistettuja kaakeliuuneja ja pitämään huolta Helsingin vanhimmasta huvilasta.', 2, 3, 1, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2),
	(21, 'Puutalkoolainen', 'Pysyykö sinulla kirves kädessä? Onko halkojen kasaaminen rentouttavaa? Kaipaatko puutalkoita ja kiehisten eli sytykkeiden veistelyä? Tule auttamaan meitä kylmenevien iltojen puuhommissa ja nauttimaan raikkaasta ulkoilmasta siinä samalla!', 1, 5, 2, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2),
	(22, 'Palstan puutarhuri', 'Oletko aina halunnut oppia kylvämään porkkanoita? Haluatko huolehtia yrttipenkistä ja kerätä piirakka-ainekset suoraan kasvimaalta? Oletko kiinnostunut villivihanneksista ja niiden hyödyntämisestä kotikeittiössä? Annalan huvilan palstalla pääset tekemään oikeaa ja aitoa puutarhurin työtä – kevyesti ja vapaaehtoisesti osaavan puutarhamestarin opastuksella. Myös lähiluontoa hyödynnetään villivihannesten satokaudella.', 2, 4, 2, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2),
	(23, 'Nikkari', 'Pysyykö sinulla vasara kädessä? Oletko haka kodin pikkunikkaroinneissa? Annalan huvilalla toisinaan tarvitaan käteviä käsiä erinäisten pienten puutöiden kanssa. Milloin tehdään palstalle portti ja milloin puisia kansia laatikoille. Tule vapaaehtoiseksi nikkariksi', 3, 4, 2, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2),
	(24, 'Somistaja', 'Luotko tavallisista arkisista esineistä mitä mielikuvituksellisempia kattauksia? Onko teematapahtumien koristelukokonaisuudet intohimosi? Tule mukaan ideoimaan, tekemään ja luomaan kanssamme tapahtumista kokonaisvaltaisen kokonaisuuden, jossa pienimmätkin yksityiskohdat on mietitty.', 5, 2, 3, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2),
	(25, 'Tapahtuma-apulainen', 'Vapaaehtoisia tarvitaan paitsi tapahtumien toteuttamiseen, myös niiden ideointiin ja suunnitteluun. Vapaaehtoisena pääset mukaan kantamaan tuoleja, opastamaan tapahtumayleisöä, korjaamaan roskia ja koristelemaan terassia. Tai jotain muuta – kerro meille, miten haluaisit olla mukana Annalan huvilan tapahtumatoiminnassa!', 3, 3, 3, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2),
	(26, 'Jokapaikan osaaja', 'Haluatko olla mukana Annalan huvilan toiminnassa, muttet löytänyt näistä tapaasi? Tule kertomaan meille, miten haluat olla mukana!', 3, 3, 3, 'email@annalanhuvila.fi', '+358 111 222', 'https://annalanhuvila.fi/', '2019-12-31', 'Keskusteltavissa', 2);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;

-- Dumping structure for taulu jobmatch.video
DROP TABLE IF EXISTS `video`;
CREATE TABLE IF NOT EXISTS `video` (
  `video_id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `task_id` int(11) NOT NULL,
  PRIMARY KEY (`video_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `video_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table jobmatch.video: ~0 rows (suunnilleen)
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
/*!40000 ALTER TABLE `video` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
