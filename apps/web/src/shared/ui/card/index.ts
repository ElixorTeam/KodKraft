import Card from "./card.astro";
import CardAction from "./card-action.astro";
import CardContent from "./card-content.astro";
import CardDescription from "./card-description.astro";
import CardFooter from "./card-footer.astro";
import CardHeader from "./card-header.astro";
import CardTitle from "./card-title.astro";

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
};

export default {
  Root: Card,
  Header: CardHeader,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Action: CardAction
};
