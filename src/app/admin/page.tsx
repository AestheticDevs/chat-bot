import { Card } from "@/components/admin/Card";

const page = () => {
  const items = [
    {
      id: 1,
      name: "Geen",
      company: "Google",
    },
    {
      id: 2,
      name: "Kamila",
      company: "Microsoft",
    },
    {
      id: 3,
      name: "Amanda",
      company: "Amazon",
    },
    {
      id: 4,
      name: "Zack",
      company: "Facebook",
    },
  ];

  return (
    // Wrapper
    <div className="w-full">
      <div className="text-2xl font-bold">Set up your Chat Bot</div>

      <div className="mt-6 grid grid-cols-4 gap-4">
        {items.map((item, index) => (
          <Card key={index} name={item.name} company={item.company} />
        ))}
      </div>
    </div>
  );
};

export default page;
