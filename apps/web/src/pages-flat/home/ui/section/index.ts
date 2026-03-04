import Section from "./section.astro";
import SectionContent from "./section-content.astro";
import SectionDescription from "./section-description.astro";
import SectionHeader from "./section-header.astro";
import SectionTitle from "./section-title.astro";

export {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle
};

export default {
  Root: Section,
  Header: SectionHeader,
  Title: SectionTitle,
  Description: SectionDescription,
  Content: SectionContent
};
