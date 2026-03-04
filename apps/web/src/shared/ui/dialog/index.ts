import Dialog from "./dialog.astro";
import DialogClose from "./dialog-close.astro";
import DialogContent from "./dialog-content.astro";
import DialogFooter from "./dialog-footer.astro";
import DialogHeader from "./dialog-header.astro";
import DialogTitle from "./dialog-title.astro";
import DialogTrigger from "./dialog-trigger.astro";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
};

export default {
  Root: Dialog,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Close: DialogClose
};
