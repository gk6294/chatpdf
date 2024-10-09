"use client";

import { signOut } from "../authenticate/auth.action";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
}