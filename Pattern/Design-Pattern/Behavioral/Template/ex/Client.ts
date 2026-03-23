import AI from "./AI";
import Programmer from "./Programmer";

const programmer = new Programmer('ceilf6')
const ai = new AI('cc')

const aDay = ['at8', 'at10', 'at14', 'at20', 'at22', 'at24']

for (const time of aDay) {
    programmer[time]()
    ai[time]()
}