import Broker from "./Broker";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";

const broker1 = new Broker()

const sub1 = new Subscriber(1, broker1)
const sub2 = new Subscriber(2, broker1)

const pub1 = new Publisher(broker1)
const pub2 = new Publisher(broker1)
const pub3 = new Publisher(broker1)

sub1.subscribe('ceilf6')
sub1.subscribe('ceilf7')

sub2.subscribe('ceilf6')

pub1.publish('ceilf6', 'cool')
pub2.publish('ceilf7',' not bad')