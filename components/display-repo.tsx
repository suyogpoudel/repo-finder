"use client";

import { getRepos, Repo } from "@/actions/getRepos";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "./ui/multi-select";
import { languages } from "@/data/languages";
import Link from "next/link";
import { Code, Eye, GitFork, Star } from "lucide-react";
import { Separator } from "./ui/separator";

const DisplayRepo = () => {
  const [repo, setRepo] = useState<Repo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string | null>(null);

  const fetchRepo = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!language) {
        setError("Please select a language");
        setLoading(false);
        return;
      }
      const data = await getRepos(language);
      setRepo(data);
    } catch (error: any) {
      setError(`Failed to fetch repository: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="w-full">
            <MultiSelect
              single
              onValuesChange={(values) => setLanguage(values[0] ?? null)}
            >
              <MultiSelectTrigger className="w-full">
                <MultiSelectValue placeholder="Select a language" />
              </MultiSelectTrigger>

              <MultiSelectContent search={{ placeholder: "Search a language" }}>
                <MultiSelectGroup>
                  {languages.map((lang) => (
                    <MultiSelectItem
                      key={lang.value}
                      value={lang.value}
                    >
                      {lang.title}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
          </CardTitle>
          <CardDescription>
            <Button
              onClick={fetchRepo}
              disabled={loading}
            >
              Get Repo
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent className={`flex items-center justify-center flex-col`}>
          {!repo && (
            <div
              className={`flex items-center justify-center w-full bg-background/50 rounded-xl p-4 ${error && "bg-destructive/50"}`}
            >
              {error ? (
                <div className="flex flex-col items-center">
                  <p>{error}</p>
                  {language && (
                    <Button
                      variant={"secondary"}
                      onClick={fetchRepo}
                      className="mt-4"
                    >
                      Refresh
                    </Button>
                  )}
                </div>
              ) : loading ? (
                <p>Loading...</p>
              ) : (
                <p>Select a language and click the button</p>
              )}
            </div>
          )}

          {repo && (
            <div className="flex flex-col items-center justify-center w-full bg-background/50 rounded-xl p-8 gap-4">
              <div className="flex justify-between items-center w-full">
                <Link
                  href={repo.url}
                  target="_blank"
                  className="text-lg hover:underline underline-offset-4"
                >
                  <h3 className="font-semibold">{repo.name}</h3>
                </Link>
                <Link
                  href={repo.ownerUrl}
                  target="_blank"
                  className="text-muted-foreground hover:underline underline-offset-4"
                >
                  {repo.ownerUsername}
                </Link>
              </div>

              <p className="text-lg text-muted-foreground w-full">
                {repo.description || "No description found"}
              </p>

              <Separator />

              <div className="flex justify-between items-center w-full">
                <span className="text-primary">{repo.language}</span>
                <div className="flex gap-2 items-center text-sm text-muted-foreground">
                  <Star />
                  <span>{repo.stargazersCount}</span>
                </div>
                <div className="flex gap-2 items-center text-sm text-muted-foreground">
                  <GitFork />
                  <span>{repo.forksCount}</span>
                </div>
              </div>

              <Separator />

              <Button
                variant="secondary"
                className="w-full"
                onClick={fetchRepo}
              >
                Refresh
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DisplayRepo;
