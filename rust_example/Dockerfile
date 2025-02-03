FROM rust:latest

WORKDIR rust_example

COPY src/main.rs main.rs
COPY Cargo.toml Cargo.lock .

RUN cargo build --release

CMD ["./target/release/app"]
