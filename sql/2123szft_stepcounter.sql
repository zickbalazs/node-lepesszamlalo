-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Okt 26. 12:44
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `2123szft_stepcounter`
--
CREATE database if not exists 2123szft_stepcounter default character set utf8 collate utf8_hungarian_ci;
-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `stepdatas`
--

CREATE TABLE `stepdatas` (
  `ID` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `stepcount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `stepdatas`
--

INSERT INTO `stepdatas` (`ID`, `uid`, `date`, `stepcount`) VALUES
(1, 1, '2022-10-19', 17000),
(2, 1, '2022-10-18', 11000),
(3, 1, '2022-10-17', 5000),
(4, 1, '2022-10-16', 7800),
(5, 1, '2022-10-15', 7289),
(6, 1, '2022-10-12', 4556),
(7, 8, '2022-10-25', 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `passwd` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `reg` datetime NOT NULL DEFAULT current_timestamp(),
  `last` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `name`, `email`, `passwd`, `reg`, `last`, `status`) VALUES
(1, 'admin', 'admin@admin.hu', 'd033e22ae348aeb5660fc2140aec35850c4da997', '2022-10-12 13:37:11', '2022-10-12 13:36:48', 1),
(3, 'tesztuer 1', 'teszt1@gmail.com', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '2022-10-14 10:29:08', NULL, 1),
(5, 'tesztuser 2', 'teszt2@gmail.com', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '2022-10-14 10:30:32', NULL, 1),
(6, 'test5', 'teszt5@gmail.com', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '2022-10-18 12:23:16', NULL, 0),
(7, 'teszt6', 'teszt6@gmail.com', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '2022-10-18 12:24:13', NULL, 1),
(8, 'zick', 'zick@zick.com', '7af2d10b73ab7cd8f603937f7697cb5fe432c7ff', '2022-10-25 12:14:27', NULL, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `stepdatas`
--
ALTER TABLE `stepdatas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`uid`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `stepdatas`
--
ALTER TABLE `stepdatas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `stepdatas`
--
ALTER TABLE `stepdatas`
  ADD CONSTRAINT `stepdatas_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
