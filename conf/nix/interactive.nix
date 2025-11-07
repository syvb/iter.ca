{ config, lib, pkgs, modulesPath, ... }:
{
  services.displayManager.sddm.enable = true;
  services.xserver.enable = true;
  services.desktopManager.plasma6.enable = true;
  services.pulseaudio.enable = false;

  security.rtkit.enable = true;
  services.pipewire = {
    enable = true;
    alsa.enable = true;
    alsa.support32Bit = true;
    pulse.enable = true;
    # If you want to use JACK applications, uncomment this
    #jack.enable = true;

    # use the example session manager (no others are packaged yet so this is enabled by default,
    # no need to redefine it in your config for now)
    #media-session.enable = true;
  };

  nixpkgs.config.permittedInsecurePackages = [
    # for logseq
    "electron-27.3.11"
  ];

  users.users.loops = {
    isNormalUser = true;
    description = "Smitty";
    extraGroups = [ "networkmanager" "wheel" ];
    packages = with pkgs; [
      # Internet
      firefox
      chromium
      thunderbird
      tor-browser

      # Editors
      kdePackages.kate
      vscodium
      logseq
      jetbrains.idea-community-src
      maven
      jdk17

      # Dev
      rustup
      gcc

      # Art
      inkscape
      prusa-slicer
      blender

      # Fonts
      inter
    ];
  };
}
