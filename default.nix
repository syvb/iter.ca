with import <nixpkgs>{};
stdenv.mkDerivation rec {
    pname = "scom";
    version = "0.0.0";

    buildInputs = [
        nodejs
        hugo
    ];

    src = ./.;
}
