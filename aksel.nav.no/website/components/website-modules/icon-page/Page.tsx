import { useMedia } from "@/utils";
import * as Icons from "@navikt/aksel-icons";
import meta from "@navikt/aksel-icons/metadata";
import { Heading, Modal, Search, ToggleGroup } from "@navikt/ds-react";
import cl from "classnames";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { SuggestionBlock } from "components/website-modules/suggestionblock";
import Fuse from "fuse.js";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { categorizeIcons, getFillIcon } from "./utils";
import { IconSidebar } from "./Sidebar";
import { TitleLinks } from "./TitleLinks";

const fuseStroke = new Fuse(
  Object.values(meta).filter((x) => x.variant.toLowerCase() === "stroke"),
  {
    threshold: 0.2,
    keys: [
      { name: "name", weight: 3 },
      { name: "category", weight: 2 },
      { name: "sub_category", weight: 2 },
      { name: "keywords", weight: 3 },
      { name: "variant", weight: 1 },
    ],
    shouldSort: false,
  }
);

const fuseFill = new Fuse(getFillIcon(Object.values(meta)), {
  threshold: 0.2,
  keys: [
    { name: "name", weight: 3 },
    { name: "category", weight: 2 },
    { name: "sub_category", weight: 2 },
    { name: "keywords", weight: 3 },
    { name: "variant", weight: 1 },
  ],
  shouldSort: false,
});

export const IconPage = ({ name }: { name: string }) => {
  const [query, setQuery] = useState("");
  const [toggle, setToggle] = useState<"stroke" | "fill">("stroke");
  const focusRef = useRef(null);

  const [strokeIcons] = useState(
    Object.values(meta).filter((x) => x.variant.toLowerCase() === "stroke")
  );

  const [fillIcons] = useState(getFillIcon(Object.values(meta)));

  const hideModal = useMedia("screen and (min-width: 1024px)");

  const categories = useMemo(() => {
    if (toggle === "fill") {
      return categorizeIcons(
        query
          ? fuseFill.search(query).map((result) => result.item as any)
          : fillIcons
      );
    }
    return categorizeIcons(
      query
        ? fuseStroke.search(query).map((result) => result.item as any)
        : strokeIcons
    );
  }, [toggle, query, strokeIcons, fillIcons]);

  const router = useRouter();

  useEffect(() => {
    hideModal && Modal.setAppElement("#__next");
  }, [hideModal]);

  return (
    <>
      <Head>
        <title>Ikoner</title>
        <meta property="og:title" content="Aksel ikoner" />
        <meta
          name="description"
          content="800+ open source-ikoner designet og utviklet for NAV"
          key="desc"
        />
        <meta
          property="og:description"
          content="800+ open source-ikoner designet og utviklet for NAV"
          key="ogdesc"
        />
        <meta
          property="og:image"
          content="https://aksel.nav.no/images/og/og-ikoner.png"
          key="ogimage"
        />
      </Head>

      <div className="bg-surface-subtle">
        <Header variant="transparent" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] focus:outline-none"
        >
          <div className="centered-layout mb-40 grid max-w-screen-lg pt-20">
            <div className="mx-auto flex w-full flex-col sm:max-w-[80%] md:max-w-screen-md">
              <div>
                <h1 className="from-deepblue-800 via-deepblue-400 my-0 w-fit bg-gradient-to-tr to-violet-500 bg-clip-text text-7xl font-bold text-transparent">
                  Aksel ikoner
                </h1>
                <div className="override-text-no-max mt-4 text-xl">
                  <p>{`${
                    Object.values(meta).length
                  } open source-ikoner designet og utviklet for NAV`}</p>
                </div>
              </div>
              <TitleLinks />
            </div>
            <div className="shadow-medium z-10 mt-16 mb-8 rounded-2xl p-[2px]">
              <div className="bg-surface-default  h-full w-full rounded-[15px]">
                <div className="border-b-border-subtle bg-surface-default sticky top-0 z-20 grid items-center rounded-t-2xl border-b">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex h-fit w-full items-center gap-4 py-2 px-4"
                  >
                    <div className="min-w-fit">
                      <ToggleGroup
                        size="small"
                        value={toggle}
                        onChange={(v) => setToggle(v as any)}
                      >
                        <ToggleGroup.Item value="stroke">
                          Stroke
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="fill">Fill</ToggleGroup.Item>
                      </ToggleGroup>
                    </div>
                    <div className="flex w-full items-center gap-2 ">
                      <Search
                        variant="simple"
                        label="Ikonsøk"
                        className="border-none"
                        placeholder="Søk"
                        autoComplete="off"
                        onChange={setQuery}
                        value={query}
                        clearButton={false}
                      />
                    </div>
                  </form>
                </div>
                <div className="flex">
                  <div
                    className={cl(
                      "animate-fadeIn transition-width grid w-full place-content-start gap-8 px-6 py-8",
                      {
                        "border-r-border-subtle border-r": !!name,
                        "basis-2/3": name,
                      }
                    )}
                  >
                    {categories.length === 0 && (
                      <div>
                        <SuggestionBlock variant="ikon-not-found" />
                      </div>
                    )}
                    {categories.map((cat) => {
                      return (
                        <div key={cat.category}>
                          <Heading
                            level="2"
                            size="small"
                            className="text-text-default"
                            spacing
                          >
                            {cat.category}
                          </Heading>
                          <div className="grid w-full gap-2">
                            {cat.sub_categories.map((sub) => {
                              return (
                                <div key={sub.sub_category}>
                                  <Heading
                                    level="3"
                                    size="xsmall"
                                    className="text-text-subtle mb-1"
                                  >
                                    {sub.sub_category}
                                  </Heading>
                                  <div className="gap-05 flex flex-wrap">
                                    {sub.icons.map((i) => {
                                      const T = Icons[`${i.id}Icon`];
                                      if (T === undefined) {
                                        console.log(i);
                                        return null;
                                      }
                                      return (
                                        <Link
                                          href={`/ikoner/${i.id}`}
                                          scroll={false}
                                          key={i.id}
                                          prefetch={false}
                                          id={i.id}
                                          tabIndex={0}
                                          ref={(el) => {
                                            if (name === i.id) {
                                              focusRef.current = el;
                                            }
                                          }}
                                          className={cl(
                                            "hover:bg-surface-hover bg-surface-default active:bg-surface-neutral-subtle-hover group relative grid aspect-square w-11 shrink-0 place-items-center rounded focus:outline-none focus:ring-2 focus:ring-blue-800",
                                            {
                                              "bg-surface-selected ring-border-alt-3 z-10 ring-1":
                                                i.id === name,
                                            }
                                          )}
                                        >
                                          <span className="navds-sr-only">
                                            {i.name}
                                          </span>
                                          <T
                                            className="text-3xl"
                                            aria-hidden
                                            alt=""
                                          />
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {name && hideModal && (
                    <IconSidebar name={name} focusRef={focusRef} />
                  )}

                  {!hideModal && (
                    <Modal
                      open={!!name}
                      onClose={() =>
                        router.push(`/ikoner#${name}`, undefined, {
                          shallow: true,
                        })
                      }
                      closeButton={false}
                      aria-modal
                      aria-label={`${name} ikon`}
                      className="bg-surface-default focus-visible:shadow-focus z-modal absolute block h-full overflow-y-auto rounded py-6 px-6 focus:outline-none"
                    >
                      {name && <IconSidebar name={name} focusRef={focusRef} />}
                    </Modal>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};