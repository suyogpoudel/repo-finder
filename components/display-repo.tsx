"use client";

import { getRepos, Repo } from "@/actions/getRepos";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

const DisplayRepo = () => {
  const [repo, setRepo] = useState<Repo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRepo = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRepos("Javascript");
      setRepo(data);
    } catch (error) {
      setError("Failed to fetch Repository. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <Button
            onClick={fetchRepo}
            disabled={loading}
          >
            Fetch Javascript
          </Button>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading....</p>}
          {repo && !loading && !error ? (
            <div>
              <h1>{repo.name}</h1>
              <p>{repo.description}</p>
            </div>
          ) : (
            !loading && !error && <p>Select a language</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DisplayRepo;
