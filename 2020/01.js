// prettier-ignore
const inputs = [
  1388, 508, 1855, 1249, 1405,
  1618, 1286, 1485, 1827, 1188,
  1369, 1977, 910, 1398, 1912,
  1575, 1713, 1771, 1506, 1056,
  1890, 1065, 1591, 1438, 1155,
  1275, 1622, 972, 1918, 1959,
  1860, 1396, 1832, 1562, 1935,
  1687, 1344, 1709, 1498, 1875,
  1467, 1557, 1166, 1090, 1363,
  1754, 987, 1548, 1334, 1315,
  1300, 1043, 1417, 1040, 1955,
  1440, 1635, 1519, 1305, 552,
  1776, 1723, 1109, 1914, 981,
  1886, 1607, 1639, 1582, 1444,
  1627, 1157, 2008, 1554, 1781,
  1847, 1415, 1915, 1416, 1431,
  1579, 1193, 1921, 1971, 1360,
  1631, 1972, 1988, 1813, 1378,
  1505, 1973, 1585, 1091, 1853,
  1531, 731, 1546, 1895, 1348,
  1913, 1387, 1885, 1204, 1499,
  1975, 1664, 1828, 1616, 1841,
  1129, 137, 1676, 1694, 1928,
  1354, 1814, 1228, 1588, 1642,
  1261, 1446, 1903, 2003, 1751,
  1083, 1829, 140, 1599, 1968,
  1725, 1987, 1931, 1810, 1628,
  2009, 1159, 1142, 1331, 1859,
  1111, 1637, 1801, 1376, 1902,
  1345, 1307, 1570, 1990, 1784,
  1524, 1997, 1098, 1967, 1442,
  1927, 1251, 1753, 1194, 1648,
  1483, 1609, 1716, 1583, 1128,
  1514, 1738, 1881, 1502, 1120,
  1112, 433, 1033, 1208, 1982,
  1544, 1169, 1306, 1690, 1590,
  1938, 1177, 1819, 1568, 1666,
  1682, 1844, 1783, 1774, 1688,
  1925, 1471, 1203, 2007, 1769,
  1323, 1370, 1689, 1268, 1868,
];

const findTwoInputs = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    const active = inputs[i];
    for (let j = 0; j < inputs.length; j++) {
      const compare = inputs[j];
      const math = active + compare === 2020;
      if (math) {
        return [active, compare];
      }
    }
  }
};

const findThreeInputs = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    const active = inputs[i];
    for (let j = 0; j < inputs.length; j++) {
      const compare1 = inputs[j];
      for (let l = 0; l < inputs.length; l++) {
        const compare2 = inputs[l];
        const math = active + compare1 + compare2 === 2020;
        if (math) {
          return [active, compare1, compare2];
        }
      }
    }
  }
};

const [input1, input2] = findTwoInputs(inputs);

const answer1 = input1 * input2;

const [input3, input4, input5] = findThreeInputs(inputs);

const answer2 = input3 * input4 * input5;
