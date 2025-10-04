import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@resolid/react-ui";
import type { PropItem } from "~/components/mdx-code-demo";
import { SpriteIcon } from "~/components/sprite-icon";

export const MdxPropsTable = ({ componentProps }: { componentProps: PropItem[] }) => {
  return (
    <table className={"not-prose border-bd-subtle my-4 w-full table-auto border-separate rounded-md border text-sm"}>
      <thead>
        <tr className={"bg-bg-subtle"}>
          <th className={"hidden whitespace-nowrap p-2 text-left md:table-cell"}>属性</th>
          <th className={"hidden whitespace-nowrap p-2 text-left md:table-cell"}>类型</th>
          <th className={"hidden whitespace-nowrap p-2 text-center md:table-cell"}>默认值</th>
          <th className={"hidden whitespace-nowrap p-2 text-center md:table-cell"}>必须</th>
        </tr>
      </thead>
      <tbody>
        {componentProps.map((prop, i) => (
          <tr
            className={
              "border-b-bg-subtle md:flex-no-wrap mb-px flex flex-row flex-wrap border-b pb-px last:mb-0 last:border-none last:pb-0 md:mb-0 md:table-row md:border-none"
            }
            key={`${prop.name}-${i}`}
          >
            <td className={"block w-full font-bold md:table-cell md:w-auto md:p-2"}>
              <div className="bg-bg-subtle w-15 mr-3 inline-block p-2 text-sm font-bold md:hidden">属性</div>
              <div className={"inline-flex items-center gap-1.5"}>
                {prop.name}

                {prop.description && (
                  <Tooltip interactive>
                    <TooltipTrigger>
                      <SpriteIcon className={"hidden md:block"} size={"1.25em"} name={"info"} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <TooltipArrow />
                      {prop.description.split("\n").map((p, idx) => {
                        const key = `p${idx}`;

                        if (p.slice(0, 6) == "@link") {
                          const link = p.slice(6);

                          return (
                            <p key={key}>
                              <a
                                className={"text-link hover:text-link-hovered"}
                                href={link}
                                rel={"noreferrer"}
                                target={"_blank"}
                              >
                                {link}
                              </a>
                            </p>
                          );
                        }

                        return <p key={key}>{p}</p>;
                      })}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </td>
            <td className={"block w-full font-bold md:hidden"}>
              <div className={"p-2"}>
                {prop.description.split("\n").map((p, idx) => {
                  const key = `p${idx}`;

                  if (p.slice(0, 6) == "@link") {
                    const link = p.slice(6);

                    return (
                      <p key={key}>
                        <a
                          className={"text-link hover:text-link-hovered"}
                          href={link}
                          rel={"noreferrer"}
                          target={"_blank"}
                        >
                          {link}
                        </a>
                      </p>
                    );
                  }

                  return <p key={key}>{p}</p>;
                })}
              </div>
            </td>
            <td className={"block w-full md:table-cell md:w-auto md:p-2"}>
              <span className="bg-bg-subtle w-15 mr-3 inline-block p-2 text-sm font-bold md:hidden">类型</span>
              <span>{prop.type}</span>
            </td>
            <td className={"block w-full whitespace-nowrap md:table-cell md:w-auto md:p-2 md:text-center"}>
              <span className="bg-bg-subtle w-15 mr-3 inline-block p-2 text-sm font-bold md:hidden">默认值</span>
              <span>{prop.defaultValue || "-"}</span>
            </td>
            <td className={"block w-full whitespace-nowrap md:table-cell md:w-auto md:p-2 md:text-center"}>
              <span className="bg-bg-subtle w-15 mr-3 inline-block p-2 text-sm font-bold md:hidden">必须</span>
              <span>{prop.required ? "true" : "false"}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
