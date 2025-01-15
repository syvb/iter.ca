{ config, lib, pkgs, modulesPath, ... }:
{
  services.xserver.enable = true;
  services.xserver.displayManager.sddm.enable = true;
  services.xserver.desktopManager.plasma5.enable = true;

  hardware.pulseaudio.enable = false;
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
      kate
      vscodium
      logseq

      # Dev
      rustup
      gcc

      # Art
      inkscape
      prusa-slicer
      blender
    ];
  };
}
