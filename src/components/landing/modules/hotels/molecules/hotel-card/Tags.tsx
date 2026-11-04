type Props = {
  tags: {
    id: number;
    title: string;
  }[];
  slicedCount?: number;
};

// ----------------------------

export default function Tags(props: Props) {
  const { tags, slicedCount = 3 } = props;

  return (
    <div className="absolute top-1 left-4 flex flex-col items-end gap-2 xl:top-5 xl:left-auto xl:right-5 xl:items-start">
      {tags?.slice(0, slicedCount).map((tag) => (
        <span
          key={tag.id}
          className="w-fit bg-cs-blue/10 text-cs-blue text-cs07/4 font-bold px-2 py-1 border border-cs-blue/20 rounded-md"
        >
          {tag.title}
        </span>
      ))}
    </div>
  );
}
