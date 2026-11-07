// /contact and /booking are one page — /booking is the canonical
// destination for contact + booking inquiries. This redirect keeps any
// existing /contact links and bookmarks working.
import { redirect } from "next/navigation";

export default function ContactPage() {
  redirect("/booking");
}
