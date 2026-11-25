import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { MemberCheckInGate } from "@/components/member/MemberCheckInGate";

export const metadata: Metadata = {
  title: "Member check-in",
  description: "Check in or check out of your Fitzenix gym from the web.",
  robots: { index: false, follow: false },
};

export default function MemberCheckInPage() {
  return (
    <Container className="section-pad pb-24">
      <MemberCheckInGate />
    </Container>
  );
}
