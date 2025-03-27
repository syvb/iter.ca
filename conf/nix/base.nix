# Should be imported into each system file

{ config, lib, pkgs, modulesPath, ... }:
{
  imports =
    [
      /etc/nixos/hardware-configuration.nix
    ];

  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;
  boot.tmp.cleanOnBoot = true;

  networking.networkmanager.enable = true;

  time.timeZone = "America/Toronto";
  i18n.defaultLocale = "en_CA.UTF-8";

  services.xserver = {
    xkb.layout = "us";
    xkb.variant = "colemak";
  };
  console.useXkbConfig = true;

  services.printing.enable = true; # Enable CUPS to print documents

  nixpkgs.config.allowUnfree = true;

  environment.systemPackages = with pkgs; [
    git
    gh
    wget
    lld
    tree
    whois
    jq
    pkg-config
    openssl
    openssl.dev
    imagemagick
    dig
    killall
    gnumake
    unzip
    xxd
    units
    python3
    mercurial
    fd
  ];
  programs.mtr.enable = true;
  environment.sessionVariables = rec {
    PKG_CONFIG_PATH = "${pkgs.openssl.dev}/lib/pkgconfig";
  };

  nix.settings.experimental-features = [ "nix-command" "flakes" ];
  nix.settings.trusted-users = [ "loops" ];

  # hibernate on sleep doesn't work right for me
  powerManagement.enable = false;

  # Open ports in the firewall.
  # networking.firewall.allowedTCPPorts = [ ... ];
  # networking.firewall.allowedUDPPorts = [ ... ];
  # Or disable the firewall altogether.
  # networking.firewall.enable = false;
}
