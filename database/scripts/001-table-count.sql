CREATE TABLE "count" (
    "id"  SERIAL  NOT NULL,
    "sum" INT NOT NULL DEFAULT 0,
    CONSTRAINT "pk_count" PRIMARY KEY (
        "id"
    )
);