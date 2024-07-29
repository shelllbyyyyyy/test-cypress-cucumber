import NavigationBar from "@/components/elements/navigation-bar";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <main className="flex h-screen flex-col items-center justify-center p-24">
        <h1>This is Homepage</h1>
      </main>
    </>
  );
}
