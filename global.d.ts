type EnMessages = typeof import ('./src/messages/en.json');
type UaMessages = typeof import ('./src/messages/uk.json');
type RuMessages = typeof import ('./src/messages/ru.json');

declare interface IntlMessages extends string, EnMessages, UaMessages, RuMessages {}
